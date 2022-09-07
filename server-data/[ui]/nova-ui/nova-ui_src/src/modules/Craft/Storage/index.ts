import { makeAutoObservable, observable, action, computed } from 'mobx';
import API from 'API';
import InventoryStore from 'modules/Inventory/Storage';
import MockInvs from 'modules/Inventory/devMock';
import { Recipe, Ingredient, Category, Task } from '../types';
import * as TI from '~m/Inventory/types';

class CraftProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable Inventories = DEVELOPMENT ? MockInvs : ({} as Record<string, TI.Inventory>);

  @observable Recipes = [] as Recipe[];

  @observable Search = '';

  @observable CurrentRecipe = {} as Recipe;

  @observable Categories: Category[] = [];

  @observable Ingredients: Ingredient[] = [];

  @observable Tasks: Task[] = [];

  @observable CraftOutputData: AnyObject = {};

  @observable CraftInventoryId: TI.Inventory['id'];

  @computed get CraftInventory() {
    return DEVELOPMENT
      ? InventoryStore.inventories[4]
      : InventoryStore.inventories[this.CraftInventoryId];
  }

  @action fetchRecipes = (): Promise<any> =>
    API.query('fetchRecipes', {
      categories: this.Categories.map(c => c.name),
    }).then(res => {
      this.Recipes = res.data;
      return res;
    });

  @action fetchTasks = (): Promise<void> => {
    const inv = this.CraftInventory;
    return API.query('fetchTasks', { category: inv.category, identifier: inv.identifier }).then(
      res => {
        this.Tasks = res.data;
      },
    );
  };

  @action fetchIngredients = (): Promise<void> =>
    API.query('fetchIngredients', {
      recipeId: this.CurrentRecipe.id,
    }).then(res => {
      this.Ingredients = res.data;
    });

  @action setCurrentRecipe = (recipe: Recipe): void => {
    this.CurrentRecipe = recipe;
    API.query('fetchItem', {
      name: recipe.output,
    })
      .then(res => {
        this.CraftOutputData = res.data;
      })
      .catch(() => {
        /* */
      });
    this.fetchIngredients();
  };

  @action setSearch = (search: string): void => {
    this.Search = search;
  };
}

const Storage = new CraftProto();

setInterval(() => {
  Storage.Tasks.forEach(outTask => {
    outTask.timePassed += 1;
    if (outTask.endTime > outTask.startTime) {
      Storage.fetchTasks();
    }
    //   if (outTask.timePassed >= outTask.timeToCraft) {
    //     if (outTask.amount > 1) {
    //       outTask.amount -= 1;
    //       outTask.start = new Date();
    //       outTask.end = new Date(new Date().getTime() + 1000 * outTask.timeToCraft);
    //       outTask.timePassed = 0;
    //     }

    //     Storage.fetchTasks();
    //   }
  });
}, 1000);

export default Storage;
