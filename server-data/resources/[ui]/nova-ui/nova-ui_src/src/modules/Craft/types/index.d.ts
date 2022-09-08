interface Recipe {
  id: number;
  name: string;
  label: string;
  icon: string;
  category: string;
  level: number;
  output: string;
  description: string;
  stats: string[];
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  recipeId: number;
  label: string;
  count?: string;
}

type Category = {
  name: string;
  icon: string;
};

interface Task {
  id: number;
  label: string;
  startTime: number;
  endTime: number;
  amount: number;
  recipeId: Recipe['id'];
  timePassed: number;
  timeToCraft: number;
}

export { Recipe, Ingredient, Category, Task };
