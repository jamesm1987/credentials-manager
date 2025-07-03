"use client"

import * as React from "react"
import { router } from "@inertiajs/react"
import { cn } from "@/lib/utils"
import  useMediaQuery from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateClientModal() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.post("/admin/clients", { name }, {
      onSuccess: () => {
        setOpen(false)
        setName("")
        // Optionally redirect to edit page if backend returns `client.id`
        // router.visit(`/clients/${newClientId}/edit`)
      },
    })
  }

  const Form = (
    <form onSubmit={handleSubmit} className="grid items-start gap-6 px-4">
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Client</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Client</DialogTitle>
            <DialogDescription>
              Enter the client name
            </DialogDescription>
          </DialogHeader>
          {Form}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Create Client</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Client</DrawerTitle>
          <DrawerDescription>
            Enter the client name
          </DrawerDescription>
        </DrawerHeader>
        {Form}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}