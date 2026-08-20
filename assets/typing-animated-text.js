class TypingAnimatedText {
  constructor(element) {
    this.element = element;
    this.index = 0;
    this.timer = null;
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.refresh = this.refresh.bind(this);
    this.refresh();
  }

  getItems() {
    const language = document.documentElement.lang.toLowerCase().startsWith("en") ? "En" : "Pt";
    const localizedItems = this.element.dataset[`typingItems${language}`];
    return (localizedItems || this.element.dataset.typingItems || this.element.textContent)
      .split("||").map((item) => item.trim()).filter(Boolean);
  }

  refresh() {
    window.clearTimeout(this.timer);
    this.items = this.getItems();
    this.index = 0;
    this.element.setAttribute("aria-label", this.items.join(", "));
    if (this.reduceMotion.matches || this.items.length < 2) {
      this.element.textContent = this.items[0] || "";
      return;
    }
    this.type(this.items[0], 0);
  }

  type(text, characterIndex) {
    this.element.textContent = text.slice(0, characterIndex);
    if (characterIndex <= text.length) {
      this.timer = window.setTimeout(() => this.type(text, characterIndex + 1), 58);
      return;
    }
    this.timer = window.setTimeout(() => this.erase(text, text.length), 1700);
  }

  erase(text, characterIndex) {
    this.element.textContent = text.slice(0, characterIndex);
    if (characterIndex > 0) {
      this.timer = window.setTimeout(() => this.erase(text, characterIndex - 1), 32);
      return;
    }
    this.index = (this.index + 1) % this.items.length;
    this.timer = window.setTimeout(() => this.type(this.items[this.index], 0), 260);
  }
}

const typingAnimatedTexts = [...document.querySelectorAll("[data-typing-animated-text]")]
  .map((element) => new TypingAnimatedText(element));

window.addEventListener("typing-language-change", () => {
  typingAnimatedTexts.forEach((instance) => instance.refresh());
});
