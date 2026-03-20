import RuleLine from "../ui/RuleLine"

const AppFooter = () => (
  <footer className="mt-16">
    <RuleLine />
    <p
      className="text-center text-xs tracking-[0.3em] uppercase mt-6"
      style={{ color: "rgba(255,160,20,0.2)", fontFamily: "'DM Mono', monospace" }}
    >
      Pokédex Research Institute · All specimens documented
    </p>
  </footer>
)

export default AppFooter
