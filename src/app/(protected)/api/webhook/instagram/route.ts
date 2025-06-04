import { findAutomation } from '@/actions/automations/queries'
import {
	createChatHistory,
	getChatHistory,
	getKeywordAutomation,
	getKeywordPost,
	matchKeyword,
	trackResponse
} from '@/actions/webhook/queries'
import { sendDM, sendPrivateMessage } from '@/lib/fetch'
import client from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})




export async function GET(req: NextRequest) {
	const hub = req.nextUrl.searchParams.get('hub.challenge')
	return new NextResponse(hub)
}

export async function POST(req: NextRequest) {
	const webhook_payload = await req.json()
	console.log('Received webhook payload:', JSON.stringify(webhook_payload, null, 2))
	let matcher
	try {
		if (webhook_payload.entry[0].messaging) {
			matcher = await matchKeyword(
				webhook_payload.entry[0].messaging[0].message.text
			)
		}

		if (webhook_payload.entry[0].changes) {
			matcher = await matchKeyword(
				webhook_payload.entry[0].changes[0].value.text
			)
		}

		if (matcher && matcher.automationId) {
			console.log('Found keyword match for automationId:', matcher.automationId)

			if (webhook_payload.entry[0].messaging) {
				const automation = await getKeywordAutomation(matcher.automationId, true)
				console.log('Retrieved automation:', JSON.stringify(automation, null, 2))

				if (automation && automation.trigger) {
					if (
						automation.listener &&
						automation.listener.listener === 'MESSAGE'
					) {
						console.log('Sending DM with prompt:', automation.listener?.prompt)
						const direct_message = await sendDM(
							webhook_payload.entry[0].id,
							webhook_payload.entry[0].messaging[0].sender.id,
							automation.listener?.prompt,
							automation.user?.integrations[0].token!
						)

						console.log('DM API response:', direct_message)

						if (direct_message.status === 200) {
							const tracked = await trackResponse(automation.id, 'DM')
							if (tracked) {
								return NextResponse.json(
									{
										message: 'Message sent'
									},
									{ status: 200 }
								)
							}
						}
					}

					if (
						automation.listener
						&& automation.listener.listener === 'SMARTAI'
						&& automation.user?.subscription?.plan === 'PRO'
					) {
						console.log('Processing SMARTAI response')
						const smart_ai_message = await openai.chat.completions.create({
							model: 'gpt-4o',
							messages: [
								{
									role: 'assistant',
									content: `${automation.listener?.prompt}: Keep responses under 2 sentences`
								}
							]
						})

						console.log('OpenAI response:', JSON.stringify(smart_ai_message.choices[0], null, 2))

						if (smart_ai_message.choices[0].message.content) {
							const reciever = createChatHistory(
								automation.id,
								webhook_payload.entry[0].id,
								webhook_payload.entry[0].messaging[0].sender.id,
								webhook_payload.entry[0].messaging[0].message.text
							)

							const sender = createChatHistory(
								automation.id,
								webhook_payload.entry[0].id,
								webhook_payload.entry[0].messaging[0].sender.id,
								smart_ai_message.choices[0].message.content
							)

							await client.$transaction([reciever, sender])

							const direct_message = await sendDM(
								webhook_payload.entry[0].id,
								webhook_payload.entry[0].messaging[0].sender.id,
								smart_ai_message.choices[0].message.content,
								automation.user?.integrations[0].token!
							)

							console.log('DM API response:', direct_message)

							if (direct_message.status === 200) {
								const tracked = await trackResponse(automation.id, 'DM')
								if (tracked) {
									return NextResponse.json(
										{
											message: 'Message sent',
										},
										{ status: 200 }
									)
								}
							}
						}
					}
				}
			}

			if (
				webhook_payload.entry[0].changes &&
				webhook_payload.entry[0].changes[0].field === 'comments'
			) {
				console.log('Processing comment webhook')
				const automation = await getKeywordAutomation(matcher.automationId, false)
				console.log('Retrieved automation for comment:', JSON.stringify(automation, null, 2))

				const automation_post = await getKeywordPost(
					webhook_payload.entry[0].changes[0].value.media.id,
					automation?.id!
				)
				console.log('Retrieved automation post:', JSON.stringify(automation_post, null, 2))

				if (automation && automation_post && automation.trigger) {
					if (automation.listener) {
						console.log('Processing listener type:', automation.listener.listener)
						if (automation.listener.listener === 'MESSAGE') {
							console.log('Sending private message with prompt:', automation.listener?.prompt)
							const direct_message = await sendPrivateMessage(
								webhook_payload.entry[0].id,
								webhook_payload.entry[0].changes[0].value.id,
								automation.listener?.prompt,
								automation.user?.integrations[0].token!
							)
							console.log('Private message API response:', direct_message)
							if (direct_message.status === 200) {
								const tracked = await trackResponse(automation.id, 'COMMENT')

								if (tracked) {
									return NextResponse.json(
										{
											message: 'Message sent',
										},
										{ status: 200 }
									)
								}
							}
						}
						if (
							automation.listener.listener === 'SMARTAI' &&
							automation.user?.subscription?.plan === 'PRO'
						) {
							console.log('Processing SMARTAI response')
							const smart_ai_message = await openai.chat.completions.create({
								model: 'gpt-4o',
								messages: [
									{
										role: 'assistant',
										content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
									},
								],
							})
							console.log('OpenAI response:', JSON.stringify(smart_ai_message.choices[0], null, 2))
							if (smart_ai_message.choices[0].message.content) {
								const reciever = createChatHistory(
									automation.id,
									webhook_payload.entry[0].id,
									webhook_payload.entry[0].changes[0].value.from.id,
									webhook_payload.entry[0].changes[0].value.text
								)

								const sender = createChatHistory(
									automation.id,
									webhook_payload.entry[0].id,
									webhook_payload.entry[0].changes[0].value.from.id,
									smart_ai_message.choices[0].message.content
								)

								await client.$transaction([reciever, sender])

								const direct_message = await sendDM(
									webhook_payload.entry[0].id,
									webhook_payload.entry[0].changes[0].value.from.id,
									smart_ai_message.choices[0].message.content,
									automation.user?.integrations[0].token!
								)

								console.log('DM API response:', direct_message)

								if (direct_message.status === 200) {
									const tracked = await trackResponse(automation.id, 'COMMENT')

									if (tracked) {
										return NextResponse.json(
											{
												message: 'Message sent'
											},
											{ status: 200 }
										)
									}
								}
							}
						}
					}
				} else {
					console.log('Missing required data:', { 
						hasAutomation: !!automation, 
						hasAutomationPost: !!automation_post, 
						hasTrigger: !!automation?.trigger 
					})
				}
			}
		} else {
			console.log('No keyword match found')
		}

		if (!matcher) { //Customer continued a previous chat

			const customer_history = await getChatHistory(
				webhook_payload.entry[0].messaging[0].recipient.id,
				webhook_payload.entry[0].messaging[0].sender.id
			)

			if (customer_history.history.length > 0) {
				const automation = await findAutomation(customer_history.automatioId!)

				if (
					automation?.user?.subscription?.plan === 'PRO' &&
					automation.listener?.listener === 'SMARTAI'
				) {
					const smart_ai_message = await openai.chat.completions.create({
						model: 'gpt-4o',
						messages: [
							{
								role: 'assistant',
								content: `${automation.listener?.prompt} : keep responses under 2 sentences`,
							},
							...customer_history.history,
							{
								role: 'user',
								content: webhook_payload.entry[0].messaging[0].message.text,
							},
						],
					})

					if (smart_ai_message.choices[0].message.content) {
						const reciever = createChatHistory(
							automation.id,
							webhook_payload.entry[0].id,
							webhook_payload.entry[0].messaging[0].sender.id,
							webhook_payload.entry[0].messaging.message.text
						)

						const sender = createChatHistory(
							automation.id,
							webhook_payload.entry[0].id,
							webhook_payload.entry[0].messaging[0].sender.id,
							smart_ai_message.choices[0].message.content
						)
						await client.$transaction([reciever, sender])
						const direct_message = await sendDM(
							webhook_payload.entry[0].id,
							webhook_payload.entry[0].messaging[0].sender.id,
							smart_ai_message.choices[0].message.content,
							automation.user?.integrations[0].token!
						)

						if (direct_message.status === 200) {
							//if successfully send we return

							return NextResponse.json(
								{
									message: 'Message sent',
								},
								{ status: 200 }
							)
						}
					}
				}
			}

			return NextResponse.json(
				{
					message: 'No automation set',
				},
				{ status: 200 }
			)
		}
		return NextResponse.json(
			{
				message: 'No automation set',
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error processing webhook:', error)
		return NextResponse.json(
			{
				message: 'Error 500: No automation set',
			},
			{ status: 200 }
		)
	}
}
