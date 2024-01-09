import { create } from 'zustand'

const useGlobalStore = create((set) => ({
  tripRequest: {},
  destinationRequests: [],

  setTripRequest: (tripRequest) => set({ tripRequest }),
  setDestinationRequests: (destinationRequests) => set({ destinationRequests })
  
}))

export default useGlobalStore;