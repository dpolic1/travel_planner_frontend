import { create } from 'zustand'

const useGlobalStore = create((set) => ({
  tripRequest: {},
  destinationRequests: [],
  updateTripRequest: {},
  updateDestinationRequests: [],

  setTripRequest: (tripRequest) => set({ tripRequest }),
  setDestinationRequests: (destinationRequests) => set({ destinationRequests }),
  setUpdateTripRequest: (updateTripRequest) => set({ updateTripRequest }),
  setUpdateDestinationRequests: (updateDestinationRequests) => set({ updateDestinationRequests })
}))

export default useGlobalStore;