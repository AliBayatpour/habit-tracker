interface habitData {
  goals: {
    numOption: string;
    perUnit: "day" | "week" | "month";
    unit: "mins" | "times";
  };
  repeat: string[];
  title: string;
  userId: any;
}
