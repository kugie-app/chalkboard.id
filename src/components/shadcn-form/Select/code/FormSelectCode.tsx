import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'

const FormSelectCode = () => {
  return (
    <CodeModal>
        {`  
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn-ui/Default-Ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/Default-Ui/select";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

<Form {...form}>
    <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex gap-3 items-start"
    >
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
            <FormItem>
            <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
            >
                <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                <SelectItem value="m@example.com">m@example.com</SelectItem>
                <SelectItem value="m@google.com">m@google.com</SelectItem>
                <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
            </Select>

            <FormMessage />
            </FormItem>
        )}
        />
        <Button type="submit">Submit</Button>
    </form>
</Form>
                `}
      </CodeModal>
  )
}

export default FormSelectCode

