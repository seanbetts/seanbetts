export default function MadeWith({ className, heart }) {
  return <span className={className}>Made with <span role="img" aria-label="love">{heart}</span> and Codex</span>;
}
