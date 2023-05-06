import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const LoginForm = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        if (response.status === 200) {
            localStorage.setItem('isAuthenticated', 'true')
            router.push('/home')
        } else {
            const data = await response.json()
            console.log(data.message)
        }
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <div className="flex items-center justify-center p-6 h-screen bg-gray-100">
                <div className="bg-white rounded-lg p-12 shadow-xl w-96">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="card-header text-center">
                                <h3 className="text-2xl font-bold">Welcome</h3>
                            </div>
                            <hr className="my-4 mx-4 border-gray-400" />
                            <div className="card-body mt-6">
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="border border-gray-400 outline-none focus:border-blue-500 p-2 w-full rounded-md"
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="border border-gray-400 outline-none focus:border-blue-500 p-2 w-full rounded-md"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600" type='submit'>
                                Login
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm
