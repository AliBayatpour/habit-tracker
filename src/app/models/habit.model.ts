export class Habit {
  constructor(
    public id: string,
    public title: string,
    public repeat:
      string[],
    public userId: any,
    public goals: {
      numOption: string;
      unit: "mins" | "times";
      perUnit: "day" | "week" | "month";
    }
  ) {}
}
