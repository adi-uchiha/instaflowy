import { createAutomations } from "@/actions/automations"
import { useMutationData } from "./use-mutation-data"

export const useCreateAutomation = (tempId: string) => {
	const { isPending, mutate: originalMutate } = useMutationData(
		['create-automation'],
		() => createAutomations(tempId),
		'user-automations'
	)

	const mutate = (data: any) => {
		return originalMutate(data)
	}

	return { isPending, mutate }
}