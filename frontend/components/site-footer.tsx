import Link from "next/link";
import { Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border/40 bg-[#0a0a0a]">
      <div className="container max-w-7xl 3xl:max-w-[1600px] px-2 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#product" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/in/tryglimpse/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Glimpse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
