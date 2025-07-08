
"use client";

import * as React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client, Group, CredentialsByGroup } from '@/types';
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
  credentials: CredentialsByGroup[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Client',
    href: '/clients/',
  },
];

export default function ManageCredentials({ client, groups, credentials }: ManageCredentialsProps) {
  const groupNames = Object.keys(credentials.data);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Client" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">


          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    
          <Tabs defaultValue={groupNames[0]}>
            <TabsList>
              {groupNames.map((group) => (
                <TabsTrigger key={group} value={group}>
                  {group}
                </TabsTrigger>
              ))}
            </TabsList>

            {groupNames.map((groupName) => (
              <TabsContent key={groupName} value={groupName}>
                {Object.entries(credentials.data[groupName]).map(([typeName, fields]) => (
                  <Card key={typeName}>
                    <CardHeader>
                      <CardTitle>{typeName}</CardTitle>
                      <CardDescription>
                        Edit your {typeName} credentials below.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      {fields.map((field) => (
                        <div className="grid gap-3" key={field.id}>
                          <Label htmlFor={`field-${field.id}`}>{field.field_type}</Label>
                          <Input
                            id={`field-${field.id}`}
                            defaultValue={field.value}
                          />
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button>Save changes</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}