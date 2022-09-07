import React, { useState } from 'react';
import { observer } from 'mobx-react';
// components
import { Button as Btn, ButtonGroup as BtnG, Icon, Tabs } from 'libs/UI';
// storage
import Storage from 'modules/Craft/Storage';
// styles
import s from './index.local.scss';

const Button = observer(Btn);
const ButtonGroup = observer(BtnG);

const RecipeBlock = observer((): JSX.Element => {
  const { Recipes, Categories, CurrentRecipe, setCurrentRecipe, setSearch } = Storage;
  const [activeTab, setActiveTab] = useState(Categories[0] ? Categories[0].name : '');

  const searchRecipe = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const filteredRecipes = Recipes.filter(recipe =>
    recipe.label.toLowerCase().includes(Storage.Search.toLowerCase()),
  );

  return (
    <aside className={s.ComponentWrapper}>
      <Tabs
        pages={Categories}
        searchFunc={searchRecipe}
        fade="left"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {Categories.map(category => (
          <ButtonGroup key={category.name} direction="row" className={[s.Group, s.Tab]}>
            {filteredRecipes
              .filter(recipe => recipe.category === category.name)
              .map(recipe => (
                <Button
                  key={recipe.id}
                  active={CurrentRecipe.id === recipe.id}
                  className={s.Button}
                  variant="rect"
                  onClick={(): void => setCurrentRecipe(recipe)}
                >
                  <Icon className={s.Icon} name={[recipe.icon, 'unknown']} />
                  <span className={s.TextWrapper}>
                    <span className={s.ItemName}>{recipe.label}</span>
                    <span className={s.ItemDescription}>{recipe.description}</span>
                  </span>
                </Button>
              ))}
          </ButtonGroup>
        ))}
      </Tabs>
    </aside>
  );
});

export { RecipeBlock };
export default RecipeBlock;
