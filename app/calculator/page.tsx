"use client";

import { Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";

const Calculator = () => {
	const [capacity, setCapacity] = useState(0);
	const capacityValue = capacity || 0;
	const treePlanting = capacityValue * 0.04;
	const coalSaving = capacityValue * 0.35;
	const emissionReduction = capacityValue / 0.997;
	return (
		<div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="space-y-8">
				<span className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
					光伏电站发电量kWh
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
								{treePlanting.toFixed(2)} 棵树
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">等效植树</p>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<div className="text-4xl font-bold">
								{coalSaving.toFixed(2)} 吨
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">节约煤</p>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<div className="text-4xl font-bold">
								{emissionReduction.toFixed(2)} 吨
							</div>
							<p className="mt-2 text-gray-500 dark:text-gray-400">CO2减排</p>
						</CardBody>
					</Card>
				</div>
				<div>
					<div className="mt-4 prose dark:prose-invert">
						<p>等效植树 = 光伏电站发电量 * 0.04</p>
						<p>节约标准煤 /kg = 光伏电站发电量/kWh * 0.35</p>
						<p>二氧化碳排放量 = 光伏电站发电量 / 0.997</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
