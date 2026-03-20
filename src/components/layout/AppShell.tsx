import GlobalStyles from "./GlobalStyles"

type Props = { children: React.ReactNode }

const AppShell = ({ children }: Props) => (
  <div className="min-h-screen text-white" style={{ background: "#0d0800" }}>
    <GlobalStyles />
    <div className="noise-bg relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-14 app-root">
      {children}
    </div>
  </div>
)

export default AppShell
