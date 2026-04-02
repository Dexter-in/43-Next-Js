"use client"

import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link href='/' className="logo">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

                    <p>DepEvent</p>
                </Link>

                <ul>
                    <Link href="/" onClick={() => posthog.capture("nav_link_clicked", { label: "Home", href: "/" })}>Home</Link>
                    <Link href="/" onClick={() => posthog.capture("nav_link_clicked", { label: "Events", href: "/" })}>Events</Link>
                    <Link href="/" onClick={() => posthog.capture("nav_link_clicked", { label: "Create Event", href: "/" })}>Create Event</Link>

                </ul>
            </nav>
        </header>
    )
}
export default NavBar
