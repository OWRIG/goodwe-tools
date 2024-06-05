"use client";

import { Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";

const Calculator = () => {
	const [capacity, setCapacity] = useState(0);
	const capacityValue = capacity || 0;
	console.log(capacityValue);
	const emissionReduction = capacityValue * 0.475 * 0.001;
	const coalSaving = capacityValue * 0.4 * 0.001;
	const treePlanting = (emissionReduction * 1000) / 18.3 / 40 / 1000;
	return (
		<div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="space-y-8">
				<span className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
					光伏电站发电量 kWh
				</span>
				<div className="flex items-center space-x-4">
					<Input
						type="number"
						placeholder="Enter capacity (kW)"
						value={`${capacity || 0}`}
						onChange={(e) => setCapacity(parseFloat(e.target.value))}
						className="flex-1"
					/>
				</div>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<Card>
						<CardBody>
							<div className="text-4xl font-bold">
								{emissionReduction.toFixed(4)} 吨
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">CO2减排</p>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<div className="text-4xl font-bold">
								{coalSaving.toFixed(4)} 吨
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">节约煤</p>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<div className="text-4xl font-bold">
								{treePlanting.toFixed(4)} 千棵
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">等效植树</p>
						</CardBody>
					</Card>
				</div>
				<div>
					<div className="mt-4 prose dark:prose-invert">
						<p>CO2减排量(ton)=发电量(kwh) x 0.475 (kg) x 0.001 (ton/kg)</p>
						<p>节约标准煤(ton)=发电量(kwh) x 0.4 (kg) x 0.001 (ton/kg)</p>
						<p>
							等效植树量(千棵)=CO2减排量(ton) x 1000 (kg/ton) / 18.3(kg) / 40
							(年) / 1000
						</p>
						{/* CO2减排量(ton)=发电量(kwh)×0.475 (kg) *0.001 (ton/kg)
						节约标准煤(ton)=发电量(kwh)*0.4 (kg) *0.001 (ton/kg)
						等效植树量(棵)=CO2减排量(ton) *1000 (kg/ton) / 18.3(kg)/40 (年) /
						1000 */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
