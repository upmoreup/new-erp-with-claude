# Store

Zustand를 사용한 전역 상태 관리 스토어들을 여기에 저장합니다.

## 패턴

각 스토어는 별도의 파일로 생성하고, 다음과 같은 패턴을 따릅니다:

```typescript
import { create } from 'zustand'

interface StoreState {
  // state types
}

export const useStore = create<StoreState>((set) => ({
  // implementation
}))
```
