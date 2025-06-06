import { onIntegrate } from '@/actions/integrations';
import { redirect } from 'next/navigation';
type Props = {
	searchParams?: Promise<{
		code: string
	}>;
}
const Page = async ({ searchParams }: Props) => {
	const sParams = await searchParams
	const code = sParams?.code
	if (code) {
		console.log(code)
		const user = await onIntegrate(code.split("#_")[0])
		if (user.status === 200) {
			return redirect(
				`/dashboard/${user.data?.firstname}${user.data?.lastname}/integrations`
			)
		}
	}
	return redirect('/sign-up')
}

export default Page