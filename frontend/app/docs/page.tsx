"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { FileText, Code, Webhook } from "lucide-react";

const sidebarItems = [
  { title: "Overview", icon: FileText, active: true },
  { title: "API Reference", icon: Code, active: false },
  { title: "Webhooks", icon: Webhook, active: false },
];

export default function DocsPage() {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      <main className="container max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-2">
              <div className="mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                  Documentation
                </h3>
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.title}
                    href="#"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">Overview</h1>
                  <Badge variant="outline">v1.0</Badge>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Welcome to the Glimpse API documentation. Create cinematic
                  product videos programmatically.
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-6">
                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Quick Start</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Get started with Glimpse in minutes. Our API is designed to
                    be simple and intuitive while giving you full control over
                    video generation.
                  </p>
                  <div className="bg-muted/50 border border-border rounded-lg p-6 font-mono text-sm space-y-2">
                    <div className="text-muted-foreground">
                      # Install the Glimpse SDK
                    </div>
                    <div>npm install @glimpse/sdk</div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Authentication</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All API requests require authentication using an API key.
                    You can generate API keys from your dashboard.
                  </p>
                  <div className="bg-muted/50 border border-border rounded-lg p-6 font-mono text-sm space-y-2">
                    <div className="text-muted-foreground">
                      # Example request with authentication
                    </div>
                    <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                    <div className="pl-4">
                      https://api.glimpse.ai/v1/videos
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Creating Your First Video
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To create a video, send a POST request with your product
                    description. Our AI will generate a cinematic video based
                    on your input.
                  </p>
                  <div className="bg-muted/50 border border-border rounded-lg p-6 font-mono text-sm space-y-2 overflow-x-auto">
                    <div className="text-muted-foreground">
                      {"// Example: Create a video"}
                    </div>
                    <div>{"const glimpse = require('@glimpse/sdk');"}</div>
                    <div>{""}</div>
                    <div>{"const video = await glimpse.create({"}</div>
                    <div className="pl-4">
                      {'  description: "API analytics that shows churn",'}
                    </div>
                    <div className="pl-4">{'  duration: 10,'}</div>
                    <div className="pl-4">{'  style: "cinematic"'}</div>
                    <div>{"});"}</div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Response Format</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All responses are returned as JSON. Videos are processed
                    asynchronously and you'll receive a video ID that you can
                    use to check status and retrieve the final video.
                  </p>
                  <div className="bg-muted/50 border border-border rounded-lg p-6 font-mono text-sm space-y-1 overflow-x-auto">
                    <div>{"{"}</div>
                    <div className="pl-4">{'"id": "vid_abc123",'}</div>
                    <div className="pl-4">{'"status": "processing",'}</div>
                    <div className="pl-4">
                      {'"estimated_time": "60s",'}{" "}
                    </div>
                    <div className="pl-4">
                      {'"webhook_url": "https://your-app.com/webhook"'}
                    </div>
                    <div>{"}"}</div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-semibold">Rate Limits</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Rate limits vary by plan. Check your current usage and
                    limits in your dashboard.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Starter: 5 videos per month</li>
                    <li>Growth: 20 videos per month</li>
                    <li>Studio: Unlimited</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
