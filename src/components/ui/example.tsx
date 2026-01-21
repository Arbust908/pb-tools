"use client";

import { toast } from "sonner";
import { Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Example = () => {
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <Button>Default</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost" size="sm">
          Small Ghost
        </Button>
        <Button variant="link">Link Button</Button>
        <Button size="lg">Large Button</Button>
        <Button size="icon">
          <Camera color="red" />
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button
          variant="outline"
          onClick={() => toast("Event has been created")}
        >
          Simple Toast
        </Button>

        <Button
          variant="outline"
          onClick={() => toast.success("Successfully saved!")}
        >
          Success Toast
        </Button>

        <Button
          variant="outline"
          onClick={() => toast.error("Something went wrong")}
        >
          Error Toast
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            toast("Event created", {
              description: "Monday, January 20th at 4:00pm",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Toast with Action
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            const promise = () =>
              new Promise((resolve) => setTimeout(resolve, 2000));

            toast.promise(promise, {
              loading: "Loading...",
              success: "Data loaded!",
              error: "Error loading data",
            });
          }}
        >
          Promise Toast
        </Button>
      </div>
    </>
  );
};
