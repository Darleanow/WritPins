import { PinList } from '../../mock/pin';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';

const ListEntry = ({ list }: { list: PinList }) => {
  return (
      <IonLabel>{list.name}</IonLabel>
  );
};

const AllPins = () => {
  const lists = Store.useState(selectors.selectLists);
  console.log(lists)
  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>My Pins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen={true} >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Pins</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <AllPins />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
