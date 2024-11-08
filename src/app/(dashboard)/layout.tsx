"use client"
import { RedirectToSignIn, SignOutButton } from "@clerk/nextjs";
import { Unauthenticated, Authenticated } from "convex/react";
import { Sidebar, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupLabel, SidebarProvider } from "@/components/ui/sidebar";
import { PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { SidebarContent, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function DashboardLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            <Authenticated>
                <SidebarProvider>
                    <DashboardSidebar />
                    {children}
                </SidebarProvider>

            </Authenticated>
            <Unauthenticated>
                <RedirectToSignIn />
            </Unauthenticated>
        </>
    )
}

function DashboardSidebar() {

    const user = useQuery(api.functions.user.get);
    return (

        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Link href="/friends">
                                        <UserIcon />
                                        Friends
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <PlusIcon />
                            <span className="sr-only">New Direct Message</span>
                        </SidebarGroupAction>                    </SidebarGroup>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem >


                            <DropdownMenu>


                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="flex items-center">
                                        <Avatar className="size-6">
                                            <AvatarImage src={user?.image} />
                                            <AvatarFallback>{user?.username[0]}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-medium">{user?.username}</p>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <SignOutButton />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>

                </SidebarGroup>
            </SidebarFooter>
        </Sidebar >

    )
}