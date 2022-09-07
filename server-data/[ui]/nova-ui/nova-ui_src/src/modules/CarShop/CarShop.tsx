import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon } from 'libs/UI';
import classNames from 'classnames';
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Controller, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// store
import axios from 'axios';
import MechCarStore, { ICategory } from './Storage';
import s from './CarShop.local.scss';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { Colors } from './Components/Colors';

function CarShopProto(): JSX.Element {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const slides =
    MechCarStore.categoryItems.length > 0 &&
    MechCarStore.categoryItems.map((item, index) => (
      <button className={s.Item} key={item.name + index} type="button">
        <Icon name={item.icon} className={s.ItemIcon} />
        <span className={s.ItemName}>{item.name ?? index}</span>
      </button>
    ));

  const nextSlideHandler = useCallback(() => controlledSwiper?.slideNext(), [controlledSwiper]);
  const prevSlideHandler = useCallback(() => controlledSwiper?.slidePrev(), [controlledSwiper]);

  const sliderInitHandler = instance => {
    setControlledSwiper(instance);
    MechCarStore.currentItem = MechCarStore.categoryItems[instance.activeIndex];
  };

  const slideChangeHandler = instance => {
    MechCarStore.currentItem = MechCarStore.categoryItems[instance.activeIndex];
    axios.post(`http://nova-ui/carshopPreview`, MechCarStore.currentItem).catch(() => {});
  };

  const categoryChangeHandler = (name: string) => {
    MechCarStore.currentCategory = name;
  };

  const changeSliderHandler = (name: string) => {
    categoryChangeHandler(name);
    controlledSwiper?.setProgress(0);
    MechCarStore.currentItem = MechCarStore.categoryItems[controlledSwiper?.activeIndex];
    axios.post(`http://nova-ui/carshopPreview`, MechCarStore.currentItem).catch(() => {});
  };

  return (
    <div className={s.Wrapper}>
      <div className={s.WrapperTop}>
        {slides.length > 0 && (
          <div className={s.ItemGridWrapper}>
            <Button onClick={prevSlideHandler} className={s.ItemPrev} variant="rect">
              <Icon className={s.Arrow} name="arrow" />
            </Button>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Virtual, Controller, Keyboard]}
              className={s.ItemGrid}
              spaceBetween={6}
              slidesPerView={6}
              controller={{ control: controlledSwiper }}
              slideNextClass="item-next"
              slidePrevClass="item-prev"
              slideActiveClass="item-active"
              centeredSlides
              virtual
              onSwiper={sliderInitHandler}
              keyboard
              onSlideChange={slideChangeHandler}
            >
              {slides?.map((slideContent, index) => (
                <SwiperSlide key={slideContent.key} virtualIndex={index}>
                  {slideContent}
                </SwiperSlide>
              ))}
            </Swiper>
            <Button onClick={nextSlideHandler} className={s.ItemNext} variant="rect">
              <Icon className={s.Arrow} name="arrow" />
            </Button>
          </div>
        )}
      </div>
      <div className={s.WrapperLeft}>
        <div className={s.CategoryWrapper}>
          <div className={s.CategoryGrid}>
            {Object.entries(MechCarStore.categories).map(([name, item]) => (
              <button
                key={name}
                type="button"
                className={classNames(
                  s.CategoryItem,
                  MechCarStore.currentCategory === name ? s['is-active'] : null,
                )}
                onClick={() => changeSliderHandler(name)}
              >
                <Icon name={item.icon} className={s.CategoryIcon} />
                <span className={s.CategoryName}>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={s.WrapperRight}>
        {MechCarStore.currentItem?.colors?.length > 0 && (
          <div className={s.Colors}>
            <span className={s.ColorsHeader}>Цветовые вариации</span>
            <Colors
              anchor="a"
              items={MechCarStore.currentItem?.colors}
              cols={14}
              itemSize={24}
              gap={8}
              justify="center"
              noRemove
            />
          </div>
        )}
      </div>
    </div>
  );
}

export const CarShop = observer(CarShopProto);
export default CarShop;
