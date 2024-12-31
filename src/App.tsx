import { Calendar } from "@/components/Calendar/Calendar";

function App() {
  return (
    <div style={{ minWidth: '100vw', display: 'flex', justifyContent: 'center' }}>
      <div className="min-h-screen bg-background p-8" style={{ maxWidth: '540px'}} >
        <div className="max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Calendário de Conferência
          </h1>
          <p className="text-muted-foreground text-center">
            Marque os dias que você já conferiu clicando nas células do
            calendário
          </p>
        </div>
        <Calendar />
      </div>
    </div>
  );
}

export default App;
