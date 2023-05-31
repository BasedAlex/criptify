import './globals.css'
import { Providers } from './provider'

export const metadata = {
	title: 'Criptify',
	description: '--',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
