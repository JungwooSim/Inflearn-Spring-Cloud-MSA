import React from 'react';
import { Collapse } from '@grafana/ui';
import { DataFrame, SplitOpen } from '@grafana/data';
import { TraceView } from './TraceView';
import { ExploreId } from 'app/types/explore';

interface Props {
  dataFrames: DataFrame[];
  splitOpenFn: SplitOpen;
  exploreId: ExploreId;
  scrollElement?: Element;
}
export function TraceViewContainer(props: Props) {
  const { dataFrames, splitOpenFn, exploreId, scrollElement } = props;

  return (
    <Collapse label="Trace View" isOpen>
      <TraceView
        exploreId={exploreId}
        dataFrames={dataFrames}
        splitOpenFn={splitOpenFn}
        scrollElement={scrollElement}
      />
    </Collapse>
  );
}
