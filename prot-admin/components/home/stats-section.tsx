interface Stat {
    id: number
    name: string
    value: string
  }
  
  interface StatsProps {
    stats: Stat[]
  }
  
  export default function StatsSection({ stats }: StatsProps) {
    return (
      <section className="w-full border-t bg-muted/50 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-3xl font-bold md:text-4xl">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  