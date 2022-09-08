import { wrapInAPIResponse } from 'utils';
import APIMock from '../APIMock';
import CraftStorage from '~m/Craft/Storage';

let currentTaskId = 1;
// const tasks: Array<T.Task> = [];
const tasks = CraftStorage.Tasks;

const passthrough =
  name =>
  (args: AnyObject, mock: APIMock): Promise<APIResponse> =>
    mock.dbPost(name, args);

const fetchTasks = (args: { category: string; identifier: string }): Promise<APIResponse> => {
  return wrapInAPIResponse({ value: tasks, status: 200 });
};

const addTask = (args: {
  label: string;
  amount: number;
  recipeId: number;
}): Promise<APIResponse> => {
  const { label, amount, recipeId } = args;

  const recipe = CraftStorage.Recipes.find(r => r.id === recipeId);
  if (!recipe) throw new Error('No recipe found!');

  currentTaskId += 1;
  tasks.push({
    id: currentTaskId,
    recipeId,
    label,
    amount,
    startTime: Date.now(),
    endTime: Date.now() + 1000 * 10,
    timePassed: 0,
    timeToCraft: 10, // FIXME: non-fixed time to craft a recipe
  });

  return wrapInAPIResponse({ value: currentTaskId, status: 200 });
};

const delTask = (args: { id: number }): Promise<APIResponse> => {
  const { id } = args;
  const index = tasks.findIndex(task => task.id === id);
  let success = false;

  if (index >= 0) {
    tasks.splice(index, 1);
    success = true;
  }

  return wrapInAPIResponse({ value: success, status: 200 });
};

APIMock.registerCommands({
  fetchRecipes: passthrough('craft/recipes/get'),
  fetchItem: passthrough('itemtemplate/getitem'),
  fetchIngredients: passthrough('craft/ingredients/get'),
  fetchTasks,
  'craft/tasks/add': addTask,
  'craft/tasks/delete': delTask,
});

setInterval(() => {
  if (tasks.length > 0) {
    tasks[0].timePassed += 1;
  }

  tasks.forEach(outTask => {
    if (outTask.timePassed >= outTask.timeToCraft) {
      if (outTask.amount > 1) {
        outTask.amount -= 1;
        outTask.startTime = Date.now();
        outTask.endTime = Date.now() + 1000 * 10;
        outTask.timePassed = 0;
      } else {
        delTask({ id: outTask.id });
      }

      CraftStorage.fetchTasks(); // FIXME: Lua code to update tasks
    }
  });
}, 1000);
