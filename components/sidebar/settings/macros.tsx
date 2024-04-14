import { Slider } from "../../ui/slider";

interface MacrosProps {
  protein: number;
  setProtein: Function;
  carbs: number;
  setCarbs: Function;
  fat: number;
  setFat: Function;
}
export const Macros = ({
  protein,
  setProtein,
  carbs,
  setCarbs,
  fat,
  setFat,
}: MacrosProps) => {
  return (
    <>
      <div className="mt-5 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="text-muted-foreground mb-1  text-sm font-semibold">
            Protein:
          </div>

          <div className=" text-sm">{protein}</div>
        </div>

        <Slider
          value={[protein]}
          onValueChange={(values) => {
            setProtein(values[0]);
          }}
          min={10}
          max={600}
          step={5}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="mb-1 flex  items-center  space-x-1">
          <div className="text-muted-foreground text-sm font-semibold">
            Carbs:
          </div>

          <div className=" text-sm">{carbs}</div>
        </div>

        <Slider
          value={[carbs]}
          onValueChange={(values) => {
            setCarbs(values[0]);
          }}
          min={10}
          max={1000}
          step={5}
        />
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="mb-1 text-sm font-semibold">Fats:</div>

          <div className="text-muted-foreground text-sm">{fat}</div>
        </div>

        <Slider
          value={[fat]}
          onValueChange={(values) => {
            setFat(values[0]);
          }}
          min={10}
          max={500}
          step={5}
        />
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center space-x-1">
          <div className="text-muted-foreground mb-1  text-sm font-semibold">
            Workouts/week:
          </div>{" "}
          <div className=" text-sm">{protein}</div>
        </div>

        <Slider
          value={[workouts]}
          onValueChange={(values) => {
            setWorkouts(values[0]);
          }}
          min={0}
          max={7}
          step={1}
        />
      </div>
    </>
  );
};
