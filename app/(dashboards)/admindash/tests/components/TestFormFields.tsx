// app/(dashboards)/admindash/tests/components/TestFormFields.tsx
import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { TipTapEditor } from "@/components/editor/TipTapEditor"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CategoryList } from "./CategoryList"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { TestFormValues } from "@/lib/validations/tests"

interface TestFormFieldsProps {
  form: UseFormReturn<TestFormValues>
}

export function TestFormFields({ form }: TestFormFieldsProps) {
  return (
    <div className="space-y-8">
      {/* Title Field */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter test title" {...field} />
            </FormControl>
            <FormDescription>
              Give your test a clear and descriptive title.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Short Description Field */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief overview of the test"
                {...field}
                rows={3}
              />
            </FormControl>
            <FormDescription>
              A brief summary that appears in test listings (max 500 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Rich Description Field */}
      <FormField
        control={form.control}
        name="richDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Detailed Description</FormLabel>
            <FormControl>
              <TipTapEditor 
                content={field.value || ''} 
                onChange={field.onChange}
                className="min-h-[300px]"
              />
            </FormControl>
            <FormDescription>
              Provide comprehensive test details with formatting and media
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Expected Time Field */}
      <FormField
        control={form.control}
        name="expectedTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expected Duration (minutes)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                max={480}
                placeholder="e.g. 30"
                {...field}
                onChange={e => field.onChange(parseInt(e.target.value) || null)}
                value={field.value || ''}
              />
            </FormControl>
            <FormDescription>
              Estimated time to complete the test (1-480 minutes)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Categories Section */}
      <div className="border-t pt-6">
        <CategoryList form={form} />
      </div>

      {/* Published Status */}
      <FormField
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Published</FormLabel>
              <FormDescription>
                Make this test available to users
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}