import { useEffect } from "react";
import useBus from "./usebus";

export default function useBreadcrumb(list: any = []) {
  const bus = useBus();
  useEffect(() => {
    bus.emit('breadcrumbList', list);
    return () => {
      bus.emit('breadcrumbList', []);
    }
  }, []);
}