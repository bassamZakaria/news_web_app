import React from "react";
import {DatePicker, Select} from "antd";
import moment from "moment";
import useSource from "../../hooks/api/useSource";

export default function Page() {

    const sources = useSource();

    return (
        <div>
            <Select defaultValue="lucy" style={{width: 120}}>
                {/*{sources.map(source => {*/}
                {/*    <Select.Option key={source.id} value={source.id}>*/}
                {/*        {source.name}*/}
                {/*    </Select.Option>*/}
                {/*})}*/}
            </Select>
            <Select defaultValue="lucy" style={{width: 120}}>
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="disabled" disabled>
                    Disabled
                </Select.Option>
                <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
            <DatePicker defaultValue={moment('2015/01/01')}/>
            <DatePicker defaultValue={moment('2015/01/01')}/>
        </div>
    )
}