'use server'

import { onCurrentUser } from "../user"
import { createAutomation, getAutomations } from "./queries"
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