import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
// components
import { Button as Btn, Icon, Range } from 'libs/UI';
import API from 'API';
import { Ingredient } from 'modules/Craft/Components/Ingredient';
import { Stats } from 'modules/Craft/Components/Stats';
// modules
import { Inventory } from 'modules/Inventory/Components';
// storage
import Storage from 'modules/Craft/Storage';
// styles
import s from './index.local.scss';

const Button = observer(Btn);

const CraftBlock = observer((): JSX.Element => {
  const { CurrentRecipe, Ingredients, Tasks, CraftInventory } = Storage;
  const [craftAmount, setCraftAmount] = useState(0);
  const [craftButtonDisbled, setCraftButtonDisbled] = useState(false);

  //  count item amount
  const itemsAmount = {};
  Object.values(CraftInventory.items).forEach(item => {
    if (!itemsAmount[item.name]) itemsAmount[item.name] = 0;

    itemsAmount[item.name] += item.amount;
  });

  // count items in task query
  Object.values(Tasks).forEach(task => {
    const ingredients = Ingredients.filter(r => r.recipeId === task.recipeId);
    ingredients.forEach(item => {
      itemsAmount[item.name] -= item.amount * task.amount;
    });
  });

  // count total crafting items TODO FIX FIRST TIME CRAFT QUE COUNT
  let total = Infinity;

  Ingredients.forEach(item => {
    total = Math.min(total, Math.floor((itemsAmount[item.name] || 0) / item.amount));
  });

  if (total < 0 || total === Infinity) total = 0;

  useEffect((): void => {
    setCraftAmount((prevState): number => Math.min(Math.max(prevState, 0), total));
    setCraftButtonDisbled(false);
  }, [total]);

  const onIncrease = (): void => {
    setCraftAmount(prevState => Math.min(prevState + 1, total));
  };

  const onDecrease = (): void => {
    setCraftAmount(prevState => Math.max(prevState - 1, 0));
  };

  const onCraftButtonClick = (): void => {
    setCraftButtonDisbled(true);
    API.query('craft/tasks/add', {
      recipeId: CurrentRecipe.id,
      amount: craftAmount,
      label: CurrentRecipe.label,
      startTime: Date.now(),
      endTime: Date.now() + (CurrentRecipe.level + 1) * 10000,
      category: Storage.CraftInventory.category,
      identifier: Storage.CraftInventory.identifier,
    }).then(() => {
      Storage.fetchTasks();
      setCraftAmount(0);
    });
  };

  return (
    <main className={s.ComponentWrapper}>
      {Object.keys(CurrentRecipe).length !== 0 && (
        <div className={s.CraftingWrapper}>
          {CurrentRecipe && (
            <div className={s.CraftingDetails}>
              <div className={s.CraftingPicWrapper}>
                <Icon className={s.CraftingPic} name={[CurrentRecipe.icon, 'unknown']} />
              </div>
              <span>{CurrentRecipe.description}</span>
              <Stats />
            </div>
          )}
          {Ingredients && (
            <div className={s.CraftingIngredients}>
              {Ingredients.map(ingredient => (
                <Ingredient
                  key={ingredient.id}
                  amountRequired={ingredient.amount}
                  amountAvailable={itemsAmount[ingredient.name] || 0}
                  label={ingredient.label}
                  icon={ingredient.name}
                />
              ))}
            </div>
          )}
          <div className={s.CraftingOuter}>
            <div className={s.Crafting}>
              <Inventory
                id={CraftInventory.id.toString()}
                inventory={CraftInventory}
                singleItem={false}
                gridSize={16}
              />
            </div>
          </div>
          <Range
            name="count"
            displayName="Количество предметов"
            value={craftAmount}
            min={0}
            max={total}
            onChange={e => setCraftAmount(+e.target.value)}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            slotCounter={
              <span>
                {craftAmount} / {total}
              </span>
            }
          />
          <Button
            className={s.CraftingTrigger}
            variant="rect"
            disabled={craftAmount === 0 || craftButtonDisbled}
            onClick={onCraftButtonClick}
          >
            ИЗГОТОВИТЬ
          </Button>
        </div>
      )}
    </main>
  );
});

export { CraftBlock };
export default CraftBlock;
