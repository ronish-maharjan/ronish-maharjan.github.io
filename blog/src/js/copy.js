document.querySelectorAll("pre").forEach((pre) => {
  const button = document.createElement("button");

  button.className = "copy-button";
  button.textContent = "Copy";

  pre.appendChild(button);

  button.addEventListener("click", async () => {
    const code = pre.querySelector("code");

    await navigator.clipboard.writeText(code.textContent);

    button.textContent = "Copied";

    setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  });
});
