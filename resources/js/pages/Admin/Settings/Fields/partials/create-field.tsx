"use client"

import * as React from "react"
import { router } from "@inertiajs/react"
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CreateFieldModal() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [type, setType] = React.useState("")
  const [label, setLabel] = React.useState("")
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    router.post("/admin/settings/fields", { label, name, type }, {
      onSuccess: () => {
        setOpen(false)
        setLabel("")
        setName("")
        setType("")
        // Optionally redirect to edit page if backend returns `field.id`
        // router.visit(`/admin/setings/fields/${newFieldId}/edit`)
      },
    })
  }

  const Form = (
    <form onSubmit={handleSubmit} className="grid items-start gap-6 px-4">
      
      <div className="grid gap-3">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="type">Type</Label>
        <Select onValueChange={setType} value={type}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="text">Text</SelectItem>
        <SelectItem value="number">Number</SelectItem>
        <SelectItem value="password">Password</SelectItem>
      </SelectContent>
    </Select>
      </div>
      <Button type="submit">Create</Button>
    </form>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Field</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Field</DialogTitle>
            <DialogDescription>
              Enter the field name
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
        <Button>Create Field</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Field</DrawerTitle>
          <DrawerDescription>
            Enter the field name
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