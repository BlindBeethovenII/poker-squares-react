import { OPEN_HOST_PEER_GAME, CLOSE_HOST_PEER_GAME, OPEN_JOIN_PEER_GAME, CLOSE_JOIN_PEER_GAME } from '../constants/ui';

export const openHostPeerGame = () => ({
  type: OPEN_HOST_PEER_GAME,
});

export const closeHostPeerGame = () => ({
  type: CLOSE_HOST_PEER_GAME,
});

export const openJoinPeerGame = () => ({
  type: OPEN_JOIN_PEER_GAME,
});

export const closeJoinPeerGame = () => ({
  type: CLOSE_JOIN_PEER_GAME,
});
