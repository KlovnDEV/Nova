import React, { useEffect } from 'react';
// components
import { RecipeBlock, CraftBlock, InventoriesBlock, TasksBlock } from 'modules/Craft/Components';
// styles
import AppStore from 'modules/App/Storage';
import s from './index.local.scss';
// storage
import Storage from './Storage';

const Craft = (): JSX.Element => {
  const { fetchRecipes, Categories } = Storage;

  useEffect(() => {
    AppStore.refs.app.current.focus();
  }, []);

  useEffect((): void => {
    fetchRecipes().catch(e => {
      console.log(e);
    });
  }, [Categories, fetchRecipes]);

  return (
    <div className={s.Wrapper}>
      <div className={s.Inner}>
        <RecipeBlock />
        <CraftBlock />
        <InventoriesBlock />
        <TasksBlock />
      </div>
    </div>
  );
};

export { Craft };
export default Craft;
