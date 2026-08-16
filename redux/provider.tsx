/*eslint-disable*/
"use client";
import { store, persister } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
