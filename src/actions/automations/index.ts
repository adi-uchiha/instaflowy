'use server'

import { parse } from "path"
import { onCurrentUser } from "../user"
import { findUser } from "../user/queries"
import { addKeyword, addListener, addPost, addTrigger, createAutomation, deleteKeywordQuery, findAutomation, getAutomations, updateAutomation } from "./queries"
import { v4 } from 'uuid'

export const createAutomations = async (tempId?: string) => {
	const user = await onCurrentUser()
	const newId = v4()
	try {
		const create = await createAutomation(user.id, newId)
		if (create) return {
			status: 200,
			data: 'Automation created',
			tempId,
			permanentId: newId
		}
		return { status: 400, data: 'Oops! something went wrong' }
	} catch (error) {
		return { status: 500, data: 'Internal server error' }
	}
}

export const getAllAutomations = async () => {
	const user = await onCurrentUser()

	try {
		const automations = await getAutomations(user.id)
		if (automations) return { status: 200, data: automations.automations }
		return { status: 404, data: [] }
	} catch (error) {
		return { status: 500, data: [] }
	}
}

export const getAutomationInfo = async (id: string) => {
	await onCurrentUser()
	try {
		const automation = await findAutomation(id)
		if (automation) return { status: 200, data: automation }
		return { status: 404 }
	} catch (error) {
		return { status: 500 }
	}
}

export const updateAutomationName = async (
	automationId: string,
	data: {
		name: string,
		active?: boolean,
		automation?: string
	}
) => {
	await onCurrentUser()
	try {
		const update = await updateAutomation(automationId, data)
		if (update) {
			return { status: 200, data: "Automation updated successfully" }
		}
		return { status: 404, data: "Error: Could not find automation" }
	} catch (error) {
		return { status: 500, data: "Something went wrong" }
	}
}

export const saveListener = async (
	automationId: string,
	listener: 'SMARTAI' | 'MESSAGE',
	prompt: string,
	reply?: string
) => {
	await onCurrentUser()
	try {
		const create = await addListener(automationId, listener, prompt, reply)
		if (create) return { status: 200, data: 'Listener created' }
		return { status: 404, data: 'Cant save listener' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}

export const saveTrigger = async (automationId: string, trigger: string[]) => {
	await onCurrentUser()
	try {
		const create = await addTrigger(automationId, trigger)
		if (create) return { status: 200, data: 'Save trigger successfull' }
		return { status: 404, data: 'Cannot add the trigger!' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}


export const saveKeyword = async (automationId: string, keyword: string) => {
	await onCurrentUser()
	try {
		const create = await addKeyword(automationId, keyword)
		if (create) return { status: 200, data: 'Keyword added successfully' }
		return { status: 404, data: 'Cannot add the keyword!' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}

export const deleteKeyword = async (id: string) => {
	await onCurrentUser()
	try {
		const deleted = await deleteKeywordQuery(id)
		if (deleted) {
			return { status: 200, data: 'Keyword deleted successfully' }
		}
		return { status: 404, data: 'Cannot delete the keyword!' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}


export const getProfilePosts = async () => {
	const user = await onCurrentUser()
	try {
		const profile = await findUser(user.id)
		const posts = await fetch(
			`${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
		)
		const parsed = await posts.json()
		if (parsed) return { status: 200, data: parsed }
		console.log('🔴 ERROR: Unable to fetch the posts')
		return { status: 404 }
	} catch (error) {
		console.log('🔴 Server side error in getting post', error)
		return { status: 500 }
	}
}

export const savePosts = async (
	automationId: string,
	posts: {
		postId: string
		caption?: string
		media: string
		mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
	}[]
) => {
	await onCurrentUser()
	try {
		const create = await addPost(automationId, posts)

		if (create) return { status: 200, data: 'Posts attached' }

		return { status: 404, data: 'Automation not found' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}

export const activateAutomation = async (id: string, state: boolean) => {
	await onCurrentUser()
	try {
		const update = await updateAutomation(id, { active: state })
		if (update)
			return {
				status: 200,
				data: `Automation ${state ? 'Activated' : 'Disabled'}`,
			}
		return { status: 404, data: 'Automation not found' }
	} catch (error) {
		return { status: 500, data: 'Oops! something went wrong' }
	}
}