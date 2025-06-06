import { MutationFunction, MutationKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
	mutationKey: MutationKey,
	mutationFn: MutationFunction<any, any>,
	queryKey?: string,
	onSuccess?: (data: any) => void
) => {
	const client = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey,
		mutationFn,
		onSuccess: (data) => {
			if (onSuccess) onSuccess(data)
			return toast(data?.status === 200 ? 'Success' : 'Error', {
				description: data.data
			})
		},
		onSettled: async () => {
			return await client.invalidateQueries({ queryKey: [queryKey] })
		}
	})

	return { mutate, isPending }
}

export const useMutationDataState = (mutationKey: MutationKey) => {
	const data = useMutationState({
		filters: { mutationKey },
		select: (mutation) => {
			return {
				variables: mutation.state.variables as any,
				state: {
					status: mutation.state.status,
					data: mutation.state.data
				}
			}
		}
	})
	const latestVariable = data[data.length - 1]
	return latestVariable
}