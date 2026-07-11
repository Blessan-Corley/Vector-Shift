# 📹 VectorShift Assessment: Screen Recording Script

This script is written to sound **natural, conversational, and professional**. It includes clear visual cues in brackets `[ACTION]` telling you exactly what to open, drag, click, or show on your screen as you speak.

---

## 💡 Quick Tips for a Great Recording
1. **Zoom in slightly:** Press `Ctrl +` (or `Cmd +`) twice in Google Chrome and your code editor so the viewer can read the text easily.
2. **Move your mouse deliberately:** Avoid shaking or moving the cursor randomly. Move it directly to the element you are talking about.
3. **No rush:** Speak at a calm, conversational pace. If you make a mistake, pause for 2 seconds and repeat the sentence—you can easily edit it out later.
4. **Setup:** Have the React frontend open at `http://localhost:5173` (or port 3000) and your code editor open in the background before you press record. Both terminals should already be running.

---

## 🎬 The Walkthrough Script

### Scene 1: Introduction & High-Level Overview
**[ACTION: Show the PipelineForge browser interface. Have a blank canvas ready. Make sure your microphone is working clearly.]**

> **Your Script:**
> *"Hi everyone, my name is Blessan. Today I'm going to walk you through PipelineForge, my submission for the VectorShift technical assessment. Both the React frontend and FastAPI backend are already up and running in my terminal, so we can jump straight into the application. 
> 
> As a quick introduction, I’m a fresh graduate looking for my first full-time role. I’ve spent most of my time building side projects with a heavy focus on backend engineering, microservices, cloud infrastructure, and databases like Redis. While I specialize in backend systems and DevOps, I built this frontend from scratch using React Flow to demonstrate my full-stack capabilities and show how I translate backend logic into functional user interfaces."*

---

### Scene 2: Node Abstraction & The 5 Custom Blocks
**[ACTION: Drag an "Input" node and an "Output" node onto the canvas. Then, drag the custom nodes you built from the toolbar: Math, Conditional, API Request, Merge, and Note.]**

> **Your Script:**
> *"Let's start with the visual builder itself. The core requirement here was creating a scalable **Node Abstraction**. Instead of duplicate, bloated boilerplate code for every card, I created a single unified `BaseNode` component. It handles the shared headers, badges, deletion buttons, and automatically calculates the vertical spacing of handles.
> 
> To demonstrate the flexibility of this abstraction, I built five new custom node types:
> 
> *   **Math Node:** Combines two upstream values using a chosen arithmetic operation from a dropdown.
> *   **Conditional Node:** Evaluates expressions to branch our logic into True or False streams.
> *   **API Request Node:** Configures webhook requests with custom HTTP methods and URL targets.
> *   **Merge Node:** Shows a dynamic handle count. If I change the 'Number of Inputs' dropdown to 3 or 4, you can see the target handles on the left update immediately.
> *   **Note Node:** A simple annotation card with zero handles, showing that our base wrapper works cleanly even when a block doesn't participate in the flow."*

---

### Scene 3: Styling & Text Node Dynamics
**[ACTION: Move the other nodes to the side and drag a new "Text" node to the center of the canvas. Connect a standard "Input" node's value handle to the Text node's output handle to show a wire, then delete the wire by double-clicking it.]**

> **Your Script:**
> *"Regarding the styling, since I’m primarily a backend engineer, I wanted to avoid bulky, bloated UI libraries and focus on a clean, developer-centric layout. I styled it with a dark Notion-style theme, custom vector chevrons for the dropdowns, and set the handle labels to float completely outside the card borders so they never overlap with the form fields.
> 
> Now, let's look at the **Text Node**. It has two specific features:
> 
> First, it auto-resizes. If I type a single long sentence... **[ACTION: Type a long sentence in the text area]** ...the node's width expands dynamically using a hidden measuring span. If I press Enter and add more lines... **[ACTION: Press enter and type a few more lines]** ...the height automatically grows based on the scroll height.
> 
> Second, it parses variables in real-time. If I type `{{username}}` and `{{user_age}}`... **[ACTION: Type: Hello {{username}} of age {{user_age}}]** ...it immediately creates target handles on the left.
> 
> If I wire an Input block to the `username` handle... **[ACTION: Connect an Input node to the "username" handle]** ...and then decide to delete `{{username}}` from my text... **[ACTION: Delete "{{username}}" from the text box]** ...our Zustand store triggers a cleanup action that deletes the connection automatically. This prevents dangling wires in space, keeping the workspace clean. And if I want to delete a connection manually, I can simply double-click the edge. **[ACTION: Double-click any remaining connections to delete them]**"*

---

### Scene 4: Backend Integration & Graph Cycle Checks
**[ACTION: Build a clean, valid pipeline: Input -> Text (with `{{input}}`) -> LLM -> Output. Align them neatly.]**

> **Your Script:**
> *"Now let's test the backend integration. I'll assemble a valid workflow here. Let's connect our Input value into our Text variables, feed the text output into our LLM prompt, and route the LLM response to our final Output block. 
> 
> When I click 'Run Pipeline Check' at the bottom... **[ACTION: Click the "Run Pipeline Check" button]** ...the frontend serializes our nodes and edges into a JSON payload and sends it to our FastAPI server. 
> 
> The backend runs Kahn's topological sort algorithm to check for cycles. Since this graph is clean, our custom modal pops up showing that we have 4 nodes, 3 edges, and yes, it forms a valid DAG.
> 
> But what happens if a loop is introduced? Let's take the output of the LLM node and feed it back into our Text input, creating a cycle. **[ACTION: Connect the "response" handle of the LLM node back to the target handle of the Text node]**
> 
> If I click 'Run Pipeline Check' again... **[ACTION: Click the "Run Pipeline Check" button]** ...the backend instantly detects the circular dependency, and our modal adapts to a warning theme, reporting that it is not a DAG."*

---

### Scene 5: Codebase & Architecture Walkthrough
**[ACTION: Switch to your code editor (VS Code, etc.).]**

> **Your Script:**
> *"Let's take a quick look at the code structure. I've focused on keeping files small, modular, and easy to maintain.
> 
> If we open `BaseNode.jsx`... **[ACTION: Open frontend/src/nodes/BaseNode.jsx and highlight the top calculation on line 50]** ...you can see the rendering logic for handles. We dynamically calculate the top percentage of each handle based on its index relative to the total length. This is what enables handles to adjust their spacing automatically without hardcoded coordinates.
> 
> Next, in `textNode.jsx`... **[ACTION: Open frontend/src/nodes/textNode.jsx and highlight the regex VARIABLE_RE on line 14 and the useEffect on line 46]** ...we use a regex to match valid JavaScript variables in curly braces. A `useEffect` hook monitors the parsed array and calls `cleanUpNodeEdges` in our Zustand store whenever variables are renamed or removed.
> 
> Finally, let's open `main.py` in the backend... **[ACTION: Open backend/main.py and scroll to the `is_directed_acyclic_graph` function]** ...here is my cycle-checking function. It uses Kahn's algorithm, tracking node in-degrees and using a queue to traverse the graph. Because it processes each node and edge exactly once, the time complexity is a linear $O(V + E)$ and space complexity is $O(V + E)$ for the adjacency list. This linear complexity keeps the pipeline check fast and scalable, which is the kind of performance and architectural design I focus on as a backend engineer."*

---

### Scene 6: Outro
**[ACTION: Switch back to the browser displaying the finished pipeline canvas.]**

> **Your Script:**
> *"And that is PipelineForge! The project combines a modular, extensible node system with a highly performant, linear-time cycle checking backend. 
> 
> Thank you so much for walking through this with me. I'm excited about the work VectorShift is doing in the horizontal generative AI space, and I'd love the opportunity to bring my backend, API design, and system-level focus to the team. Let me know if you have any questions, and I look forward to the next steps!"*

**[ACTION: Stop the screen recording.]**
