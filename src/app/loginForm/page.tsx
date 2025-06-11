'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';



function loginForm() {
    const router = useRouter();
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: '',
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
                router.push('/dashboard');
            }
        } else {
            // Show error
            alert('Invalid email or password');
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign in to your account
        </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-200">
            Email address
            </label>
            <div className="mt-2">
            <input
            id="email"
            name="email"
            type="email"
            placeholder='name@example.com'
            value={loginData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
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
                name="password"
                type="password"
                value={loginData.password}
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
                disabled={!loginData.email || !loginData.password}
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

export default loginForm;
