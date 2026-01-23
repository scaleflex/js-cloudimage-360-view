# How I Finally Updated My Neglected Open Source Library (With a Little Help from AI)

*Every developer has that project sitting in the corner—the one you know needs love, but never quite makes it to the top of the priority list. For me, it was our 360° image viewer library. Here's how Claude Code helped me finally tackle it.*

---

## The Guilt of the Neglected Library

You know the feeling. You've built something useful, people are actually using it, and you keep meaning to modernize it. But then real work happens. Deadlines. Features that actually make money. That library update keeps getting pushed to "next sprint"—for six months straight.

Our cloudimage-360 library was exactly that project. It worked fine, but it was showing its age. No React support in 2026? Still requiring manual CSS imports? No mobile pinch-to-zoom? Every GitHub issue reminded me of what needed to be done.

The problem wasn't knowing *what* to do. It was the overhead of actually doing it. Updating a library isn't glamorous work—it's documentation, accessibility fixes, build configuration tweaks, and a hundred small decisions that add up.

## The Delegation Problem

Here's the thing about delegating this kind of work: it's almost harder than doing it yourself.

To hand this off to another developer, I'd need to:
- Write extensive documentation about how the library works
- Explain our coding style and conventions
- Review every change carefully since they lack context
- Answer endless questions about "why is this done this way?"

The onboarding cost was so high that I kept thinking "I'll just do it myself... eventually."

## Enter Claude Code

I'd been hearing about AI coding assistants, but I was skeptical. Could it really understand an existing codebase well enough to make meaningful contributions? Wouldn't I spend more time correcting mistakes than I'd save?

I decided to try Claude Code on this neglected library. My approach was simple: give it tasks during spare moments throughout my day, review what it did, and iterate. No big commitment—just chip away at it.

What happened over the next two days surprised me.

## Two Days, 41 Commits

Let me break down what we actually accomplished:

### Day 1: The Foundation

I started with documentation—usually my least favorite task.

"Polish the README and make it more readable."

Claude restructured the entire document, added a clear table of contents, improved the examples, and even identified inconsistencies I'd missed. It then suggested adding a migration guide for users moving from v3 to v4, and wrote the whole thing.

Then came the feature requests I'd been ignoring:

"Add pinch-to-zoom for mobile devices."

This wasn't a trivial task. It required handling multi-touch events, calculating zoom levels from finger distance, and integrating smoothly with existing mouse zoom. Claude wrote it, I tested it on my phone, suggested a tweak to the sensitivity—done.

"Add inertia so the rotation continues smoothly after you release."

Same story. Clear implementation, physics that felt natural, properly cleaned up event listeners.

### Day 2: The Polish

This is where it got interesting. I started asking for things I'd never have prioritized myself:

"Add accessibility features—ARIA labels, keyboard navigation, screen reader support."

Claude added a complete accessibility layer: aria-live regions for announcements, focus indicators for keyboard users, proper ARIA labels on all controls. Things I knew I *should* do but never would have gotten to.

"The hotspots feature accepts HTML content. Make sure it's secure against XSS attacks."

It wrote a complete HTML sanitizer—whitelisted tags, attribute filtering, even SVG support for icons. Security hardening I definitely wouldn't have done on my own initiative.

Then came the big one:

"Create a React wrapper with TypeScript support."

This was substantial work: a full React component with props, a custom hook for programmatic control, TypeScript type definitions, and a demo application. Claude set up the entire build pipeline to output both the vanilla JS and React versions.

## The Final Tally

After two days of on-and-off collaboration:

- **41 commits** merged
- **73 files** changed
- **7,105 lines** added
- Library version: **v3 → v4.1.3**

Here's what the library gained:

**New Features:**
- React wrapper with TypeScript and custom hooks
- Pinch-to-zoom for mobile
- Inertia/momentum on drag release
- CSS variables for theming
- Hints overlay
- Hotspot timeline navigation
- Event callbacks for all interactions

**Quality Improvements:**
- Full accessibility compliance
- XSS protection
- Memory leak fixes
- Comprehensive unit tests
- Config validation with helpful warnings

**Developer Experience:**
- Live CodeSandbox examples
- Embedded CSS (no separate import needed)
- Complete migration guide
- Contributing guidelines

## What Made This Work

Looking back, a few things made this collaboration effective:

**1. Incremental tasks**

I didn't try to do everything at once. "Add pinch-to-zoom" is a clear, testable task. "Modernize the library" is not. Small, focused requests got better results.

**2. Review and iterate**

Claude's first attempt wasn't always perfect. But the feedback loop was fast—"the zoom feels too sensitive" or "can we also support SVG in the sanitizer?" got immediate improvements.

**3. Context came free**

This is the big one. Claude could read the existing code and understand the patterns. When I asked for a React wrapper, it matched our existing API design. When I asked for accessibility, it integrated with our existing controls. No onboarding required.

**4. It handled the tedious parts**

Security auditing, accessibility compliance, documentation, test writing—the important-but-boring work that always gets deprioritized. Having a collaborator that doesn't mind this stuff was genuinely useful.

## What I Learned

I went into this skeptical about AI coding tools. I came out with a different perspective.

Claude Code isn't replacing developers. It's more like having a very capable collaborator who never gets tired of the boring parts and doesn't need to be onboarded on your codebase.

The "delegation problem" I mentioned earlier? It largely disappears when your collaborator can read and understand existing code. Instead of writing documentation to explain my library, I just said "add a React wrapper" and it figured out what that meant in the context of my specific codebase.

For that project you've been putting off—the one that's important but never urgent—this might be worth trying. Give it small tasks during spare moments. Review what it does. Iterate.

You might be surprised how much you can accomplish.

---

*The cloudimage-360 library v4.1.3 is now available with React support, mobile pinch-to-zoom, full accessibility compliance, and more. Check it out on GitHub.*

---

## Stats Summary

| Metric | Value |
|--------|-------|
| Time span (with Claude Code) | ~2 days (spare moments) |
| Estimated time (senior dev, solo) | 2-3 weeks |
| Estimated time (delegated to mid dev) | 4-6 weeks |
| Commits | 41 |
| Files changed | 73 |
| Lines added | 7,105 |
| Lines removed | 1,001 |
| Version jump | v3 → v4.1.3 |

*Time estimates for manual work include: React wrapper with TypeScript (~3 days), pinch-to-zoom and inertia (~1.5 days), accessibility compliance (~2 days), XSS sanitization (~1 day), unit tests (~1 day), documentation and migration guide (~1.5 days), build configuration (~0.5 day), plus integration and debugging. Delegation estimate adds task specification writing, multiple code review rounds, and back-and-forth communication overhead.*

### Changes by Category

| Category | What We Did |
|----------|-------------|
| Features | React wrapper, pinch-zoom, inertia, theming, hotspot timeline, event callbacks |
| Documentation | README overhaul, migration guide, CodeSandbox examples |
| Accessibility | ARIA labels, focus indicators, screen reader support, keyboard navigation |
| Security | XSS sanitization for hotspot HTML content |
| Quality | Memory leak fixes, unit tests, config validation |
| Build | IIFE format with embedded CSS, TypeScript setup, Vitest |

---

## Bonus: Cleaning Up 23 GitHub Issues in One Session

After the main development work, I had another task I'd been avoiding: our GitHub issues backlog. 43 open issues had accumulated over the years—bug reports, feature requests, questions. Some were probably already fixed. Some were outdated. But who has time to go through all of them?

I asked Claude Code to help:

*"Check our GitHub issues. See what we've actually fixed."*

What followed was a methodical review of every open issue. Claude cross-referenced each one against recent commits, searched the codebase for relevant features, and identified which issues had been silently resolved by our updates.

### The Results

**23 issues closed** in a single session:

| Issue | What Was Fixed |
|-------|----------------|
| #144 | Mobile pinch/tap zoom - now supported |
| #135 | Hotspot modals - styled modals added |
| #158 | NextJS/React support - React wrapper added |
| #159, #174 | Pointer zoom not working - fixed |
| #156, #173 | Local files URL problem - no forced cloudimg.io |
| #120 | Inertia effects - `inertia` option added |
| #129 | Autoplay end event - `onAutoplayStop` callback |
| #54 | Drag events - `onDragStart`/`onDragEnd` callbacks |
| #64 | Destroy specific element - `destroy(id)` method |
| #122 | Compiled JS in NPM - dist now included |
| #83 | Set active frame - `animateToFrame()` method |
| #52, #175 | Sync multiple viewers - possible via callbacks |
| #63 | Multi-row images - Y-axis support added |
| #161 | CSS variables, embedded SVGs - theming system |
| #165 | Start in fullscreen - `openFullscreenModal()` |
| #133 | Fullscreen sizing - `aspectRatio` option |
| #51, #130, #132 | Old browser versions - documented minimum requirements |
| #176 | Spam issue - closed |

Each closed issue got a helpful comment explaining what was fixed and how to use the new feature. Users subscribed to these issues got notified with clear documentation.

### Why This Matters

Issue backlogs are demoralizing. They signal to users that the project might be abandoned. They make contributors hesitant to report new issues.

Going through 43 issues manually would have taken hours—reading each one, checking the codebase, writing thoughtful responses. With Claude Code, I reviewed the results it found, approved the closures, and watched it write appropriate comments for each.

**28 issues remain open**—these are genuine bugs needing investigation or feature requests we haven't implemented yet. But that's a manageable backlog, not an overwhelming one.

### Updated Stats

| Metric | Value |
|--------|-------|
| Issues reviewed | 43 |
| Issues closed | 23 |
| Remaining open | 28 |
| Time spent | ~30 minutes |

The library now has a clean issue tracker that accurately reflects its current state. Users can see what's actually outstanding, and we have a clear roadmap of what to work on next.

---

## The Mobile Safari Nightmare (And How We Fixed It)

Just when I thought the library was in great shape, we discovered a critical problem: **the demo page was crashing on mobile Safari**. Not just slow—completely crashing the browser tab.

This kicked off an intensive debugging session that revealed just how different mobile browsers are from desktop, and how assumptions that work fine on desktop can be catastrophic on mobile.

### The Investigation

The symptoms were clear: load the demo page on an iPhone, scroll around, and within 30 seconds the tab would crash. Sometimes it would take the whole browser down with it.

I asked Claude to help investigate:

*"The demo page crashes on mobile Safari. Can you help figure out why?"*

What followed was a systematic memory investigation:

1. **Memory profiling** revealed the page was consuming 800MB+ of GPU memory
2. **OffscreenCanvas** (our performance optimization) was actually the culprit on Safari
3. **Touch events** were firing at 100fps, creating memory pressure from event closures
4. **Multiple viewers** on the demo page were all loading simultaneously

### The Root Causes

Mobile Safari has strict memory limits (~1.4GB total for a tab), and we were hitting them from multiple angles:

| Issue | Desktop | Mobile Impact |
|-------|---------|---------------|
| OffscreenCanvas + Web Worker | Fast, efficient | Memory leak on Safari |
| 6 concurrent image loads | Fine | Memory spikes |
| 100fps touch events | Fine | Event closure buildup |
| High DPI (3x on iPhone) | Fine | 9x memory per canvas |
| 233 images in one viewer | Fine | ~1GB GPU memory |

### The Fixes

Claude implemented a comprehensive set of mobile optimizations:

**1. Main-thread canvas rendering for mobile**
```javascript
// Detect mobile and skip OffscreenCanvas entirely
const USE_MAIN_THREAD_CANVAS = /iPhone|iPad|Android/i.test(navigator.userAgent);
```
This alone fixed the memory leak, at the cost of some performance—but stability matters more on mobile.

**2. Reduced concurrent image loading**
```javascript
const MAX_CONCURRENT_LOADS = isMobile ? 3 : 6;
```
Prevents memory spikes from too many images decoding simultaneously.

**3. Throttled touch events**
```javascript
export const THROTTLE_TIME = isMobile ? 32 : 10; // 30fps vs 100fps
```
Reduces event handler overhead on touch devices.

**4. Capped device pixel ratio**
```javascript
this.devicePixelRatio = USE_MAIN_THREAD_CANVAS ? Math.min(rawDpr, 2) : rawDpr;
```
A 3x DPI canvas uses 9x the memory. Capping at 2x is visually fine and saves significant memory.

**5. Memory management system**
This was the big one. We added `enableMemoryManagement()` which uses IntersectionObserver to:
- Release memory when viewers scroll off-screen
- Reload images when viewers become visible again
- Release all memory when the page is backgrounded

### Auto-Enabling on Mobile

Initially, memory management required users to call `enableMemoryManagement()` manually. But that's asking users to know about a problem they might not even realize exists until their page crashes.

*"Make memory management automatic on mobile. Users shouldn't need to do anything."*

Claude added auto-detection that enables memory management on first viewer initialization when on mobile:

```javascript
// In CI360 class
const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

init(container, config) {
  // ... create viewer ...

  // Auto-enable memory management on mobile (first init only)
  if (IS_MOBILE && !this.memoryManagementAutoEnabled) {
    this.memoryManagementAutoEnabled = true;
    setTimeout(() => this.enableMemoryManagement(), 100);
  }
}
```

Now mobile users get the protection automatically, while desktop users can still opt-in if they have pages with many viewers.

### Documentation Update

We also added a "Mobile Considerations" section to the README explaining:
- What optimizations are automatic
- Recommended settings (fewer images, disable zoom features)
- How to detect mobile and adjust configuration
- The memory management API for manual control

### The Results

After all fixes:
- Demo page loads successfully on iPhone Safari
- Memory stays under 400MB even with multiple viewers
- Scrolling remains smooth
- Background tabs don't crash
- Users don't need to do anything special for mobile

### What I Learned About Mobile

This investigation reinforced some important lessons:

1. **Desktop assumptions don't transfer** - What's a "performance optimization" on desktop (OffscreenCanvas) can be a crash on mobile
2. **Memory matters on mobile** - Desktop has 16GB+ RAM; mobile Safari gets ~1.4GB per tab
3. **Automatic > opt-in** - Users shouldn't need to know about memory management to have a working product
4. **Test on real devices** - Simulators don't have the same memory constraints

### Updated Stats

| Metric | Value |
|--------|-------|
| Mobile-specific commits | 6 |
| Memory reduction | 800MB → 400MB |
| Files modified | 7 |
| New documentation | Mobile Considerations section |

---

## Final Push: Closing the Remaining Issues

After the mobile fixes, we did one more cleanup pass on the GitHub issues. With all the improvements from v4.x, many more issues had been silently resolved.

### Issues Closed in Final Session

**14 more issues closed:**

| Issue | Resolution |
|-------|------------|
| #172 | iPhone Safari crashes - fixed with mobile memory optimizations |
| #168 | Lazyloading demo - demo updated |
| #166 | data-hide-360-logo hides controls - expected (control buttons removed in v4.0.0) |
| #163 | Loading speed too slow - improved with async loading |
| #157 | Tablet swiping not working - touch handling improved |
| #150 | Autoplay stops after fullscreen - fullscreen modal rewritten |
| #142 | Reverse direction button missing - control buttons deprecated, use API |
| #139 | Left/right elements never created - control buttons removed in v4.0.0 |
| #138 | Duplicate icon on update() - initialization logic fixed |
| #136 | SVG files not working - SVG support added |
| #131 | Hotspot clear timeout - new hotspot behavior in v4.0.0 |
| #86 | Mobile auto-play issues - mobile handling improved |
| #71 | Second viewer init problems - multiple viewer support fixed |
| #67 | data-keys affects all viewers - keyboard events properly scoped |

### Final Issue Stats

| Metric | Before | After |
|--------|--------|-------|
| Total open issues | 43 | 11 |
| Issues closed | - | 32 |
| Remaining (genuine bugs/features) | - | 11 |

The remaining 11 issues are legitimate feature requests (Angular integration, React Native, native lazy loading, etc.) that require actual new development—not bugs or already-fixed items.

---

## Final Results & Time Comparison

### What We Accomplished

| Metric | Value |
|--------|-------|
| Total commits | 53 |
| Files changed | 80+ |
| Lines added | 8,500+ |
| Version progression | v3 → v4.3.0 |
| GitHub issues closed | 32 |
| Issues remaining | 11 |

### Time Comparison

| Approach | Estimated Time | Notes |
|----------|----------------|-------|
| **With Claude Code** | ~3 days (spare moments) | Actual time spent |
| **Senior dev, solo** | 4-5 weeks | Full focus required |
| **Delegated to mid dev** | 8-10 weeks | Includes onboarding, reviews |

**Breakdown of manual work estimate:**

| Task | Senior Dev | Mid Dev (delegated) |
|------|------------|---------------------|
| React wrapper + TypeScript | 4 days | 7 days |
| Mobile memory investigation & fixes | 3 days | 5 days |
| Pinch-to-zoom + inertia | 2 days | 3 days |
| Accessibility compliance | 2 days | 4 days |
| XSS sanitization | 1 day | 2 days |
| Fullscreen/timeline fixes | 2 days | 3 days |
| Zoom trigger refactoring | 1 day | 2 days |
| Unit tests | 2 days | 3 days |
| Documentation + migration guide | 2 days | 3 days |
| Build configuration | 1 day | 2 days |
| GitHub issue triage (32 issues) | 1 day | 2 days |
| Code review & debugging | 3 days | 6 days |
| **Total** | **24 days (~5 weeks)** | **42 days (~8 weeks)** |

*Delegation estimate includes: writing detailed task specs, multiple code review rounds, back-and-forth communication, context-building meetings, and rework from misunderstandings.*

### The Real Value

The time savings are significant, but the real value was in what actually got done:

1. **Boring but important work** - Accessibility, security, documentation. Things that always get deprioritized but make a real difference.

2. **Deep debugging** - The mobile Safari investigation would have been painful solo. Having a collaborator systematically work through memory issues was invaluable.

3. **Consistency** - 53 commits over 3 days, all following the same patterns and conventions. No "Friday afternoon code."

4. **Issue cleanup** - 32 issues closed with thoughtful responses. Users got notified, documentation was referenced. Not just closed—properly resolved.

The library went from "works but neglected" to "actively maintained, modern, accessible, and documented." That's a transformation that typically doesn't happen without dedicated sprint time—which never comes for internal tools and side projects.

---

*js-cloudimage-360-view v4.3.0 is now available on npm and GitHub with React support, mobile optimization, full accessibility, and a clean issue tracker.*
