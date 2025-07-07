"use client";

import * as React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client, Group } from '@/types';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


interface ManageCredentialsProps {
  client: Client[];
  groups: Group[];
  credentials: Credential[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Client',
    href: '/clients/',
  },
];

export default function ManageCredentials({ client, groups, credentials }: ManageCredentialsProps) {
  console.log(client);
  console.log(credentials);
  console.log(groups);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Client" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">


          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            
             <Tabs defaultValue={groups[0].name}>
              <TabsList>
                {groups.map((group) => (
                  <TabsTrigger key={group.name} value={group.name}>
                  {group.label}
                  </TabsTrigger>
              ))}
              </TabsList>
              {groups.map((group) => (
                <TabsContent key={group.name} value={group.name}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{ group.label }</CardTitle>
                      <CardDescription>
                        Make changes to your account here. Click save when you&apos;re
                        done.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Name</Label>
                        <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Username</Label>
                        <Input id="tabs-demo-username" defaultValue="@peduarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
              
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
