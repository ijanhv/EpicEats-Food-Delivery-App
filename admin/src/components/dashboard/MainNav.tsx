import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary "
      >
        Overview
      </Link>
      <Link
        href="/recieved"
        className="text-sm font-medium transition-colors hover:text-primary "
      >
        Recieved Now
      </Link>
      <Link
        href="/orders"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        All Orders
      </Link>
      <Link
        href="/today"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Today's Orders
      </Link>
      <Link
        href="/customers"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
