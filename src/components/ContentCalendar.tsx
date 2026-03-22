import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Plus, X, Clock } from "lucide-react";

interface ScheduledItem {
  id: string;
  title: string;
  day: string;
  time: string;
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialSchedule: ScheduledItem[] = [
  { id: "1", title: "5 Hidden iPhone Features", day: "Mon", time: "12:00" },
  { id: "2", title: "Morning Routine Hacks", day: "Wed", time: "14:00" },
  { id: "3", title: "Budget Meal Prep #4", day: "Fri", time: "11:00" },
];

export function ContentCalendar() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [newTitle, setNewTitle] = useState("");
  const [newDay, setNewDay] = useState("Mon");
  const [newTime, setNewTime] = useState("12:00");
  const [showForm, setShowForm] = useState(false);

  const addItem = () => {
    if (!newTitle.trim()) return;
    const item: ScheduledItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      day: newDay,
      time: newTime,
    };
    setSchedule((prev) => [...prev, item]);
    setNewTitle("");
    setShowForm(false);
  };

  const removeItem = (id: string) => {
    setSchedule((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarDays size={24} className="text-primary" />
              Content Calendar
            </h2>
            <p className="text-muted-foreground mt-1">
              Plan your weekly Shorts schedule
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-1.5">
            <Plus size={14} />
            Add Short
          </Button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <Card className="animate-scale-in">
          <CardContent className="p-5 space-y-3">
            <Input
              placeholder="Short title…"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <div className="flex gap-2">
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                {daysOfWeek.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addItem}>Add</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 animate-fade-up stagger-1">
        {daysOfWeek.map((day) => {
          const dayItems = schedule.filter((i) => i.day === day);
          return (
            <Card key={day} className="min-h-[140px]">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {day}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 space-y-2">
                {dayItems.length === 0 && (
                  <p className="text-xs text-muted-foreground/50 italic">No shorts</p>
                )}
                {dayItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-md bg-primary/5 border border-primary/10 group relative"
                  >
                    <p className="text-xs font-medium leading-snug pr-4">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {item.time}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Posting tips */}
      <Card className="animate-fade-up stagger-2">
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-2">📅 Best Posting Times</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Weekdays</p>
              <p>12pm – 3pm</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Weekends</p>
              <p>9am – 11am</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Best Day</p>
              <p>Tuesday & Thursday</p>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="font-medium text-foreground">Frequency</p>
              <p>1-3 Shorts/day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
