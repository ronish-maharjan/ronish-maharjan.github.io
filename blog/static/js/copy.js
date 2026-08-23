document.querySelectorAll("pre").forEach((pre) => {

    const wrapper = document.createElement("div");

    wrapper.className = "code-block";

    pre.parentNode.insertBefore(wrapper, pre);

    wrapper.appendChild(pre);


    const button = document.createElement("button");

    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";

    wrapper.appendChild(button);


    button.addEventListener("click", async () => {

        const code = pre.querySelector("code");

        if (!code) {
            return;
        }

        try {

            await navigator.clipboard.writeText(code.innerText);

            button.textContent = "Copied!";

            setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);

        } catch (error) {

            console.error("Failed to copy code:", error);

            button.textContent = "Failed";

            setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);

        }

    });

});
