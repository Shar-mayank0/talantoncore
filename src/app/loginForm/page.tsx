'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { NextRequest, NextResponse } from 'next/server';



function LoginForm() {
    const router = useRouter();
    const [loginData, setLoginData] = React.useState({
        Email: '',
        Password   : '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });
        if (res.ok) {
            const data = await res.json();
            if (data.isVerified) {
                router.push('/?loggedIn=true'); // Redirect to home page with a query parameter flag
            }
        } else {
            // Show error
            alert('Invalid email or password');
            router.push('/loginForm'); // Redirect to login page
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
        alt="Your Company"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        width={40}
        height={40}
        className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
        </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <div className="mt-2">
            <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input
            onChange={handleChange}
            name="Email" 
            type="email"
            id="email" 
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" 
            placeholder="name@flowbite.com" 
            required />
            </div>
            </div>
            </div>

            <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-200">
                Password
                </label>
                <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                </a>
                </div>
            </div>
            <div className="mt-2">
                <input
                id="password"
                name="Password"
                type="password"
                value={loginData.Password}
                onChange={handleChange}
                minLength={8}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
            </div>
            </div>

            <div>
            <button
                disabled={!loginData.Email || !loginData.Password}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sign in
            </button>
            </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{' '}
            <a href="./registrationForm" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign up now
            </a>
        </p>
        </div>
    </div>
    )
}

export default LoginForm;
