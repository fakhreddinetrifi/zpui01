<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<div class="d-flex flex-column justify-content-center align-items-center mb-5">
			<div class="bd-highlight">Zamówienie numer: <b><xsl:value-of select="Order/Header/OrderId" /></b>
			</div>
			<div class="bd-highlight">Data Zamówienia: <xsl:value-of select="Order/Header/OrderDate" />;<xsl:value-of select="Order/Header/OrderTime" />
			</div>
			<div class="bd-highlight">Planowana data dostawy: <b><xsl:value-of select="Order/Header/RequestedDeliveryDate" /></b>
			</div>
		</div>
		<div class="d-flex flex-row justify-content-center mr-2 ml-2">
			<div class="ml-auto">
				<b>Zamawiający</b>
				<br/>
				<xsl:value-of select="Order/Header/Seller/Name"/>
				<br/>
				<xsl:value-of select="Order/Header/Seller/Address/StreetAndNumber"/>
				<br/>
				<xsl:value-of select="Order/Header/Seller/Address/PostalCode"/>, 
				<xsl:value-of select="Order/Header/Seller/Address/City"/>

			</div>
			<div class="mr-auto ml-auto">
				<b>Odbierający</b>
				<br/>
					Sklep <xsl:value-of select="Order/Header/Receiver/StoreId"/>
			<br />
			<xsl:value-of select="Order/Header/Receiver/Address/StreetAndNumber"/>
			<br />
			<xsl:value-of select="Order/Header/Receiver/Address/PostalCode"/>, 
			<xsl:value-of select="Order/Header/Receiver/Address/City"/>
		</div>
		<div class="mr-auto">
			<b>Sprzedawca</b>
			<br/>
				SAP ID: <xsl:value-of select="Order/Header/Buyer/SapId"/>
		<br />
		<xsl:value-of select="Order/Header/Buyer/Name"/>
		<br />
		<xsl:value-of select="Order/Header/Buyer/Address/StreetAndNumber"/>
		<br />
		<xsl:value-of select="Order/Header/Buyer/Address/PostalCode"/>, 
		<xsl:value-of select="Order/Header/Buyer/Address/City"/>
	</div>
</div>
<br/>
<br/>
<div class="d-flex flex-row justify-content-center mb-5">
	<table border="1" class="p-2 flex-fill bd-highlight ml-2 mr-2">
		<tr bgcolor="#006420">
			<th>
				<font color="#fff">Number</font>
			</th>
			<th>
				<font color="#fff">Description</font>
			</th>
			<th>
				<font color="#fff">Item Description</font>
			</th>
			<th>
				<font color="#fff">Ordered Quantity</font>
			</th>
			<th>
				<font color="#fff">Unit of Measure</font>
			</th>
		</tr>
		<xsl:for-each select="Order/Items/Item">
			<tr>
				<td>
					<xsl:value-of select="ItemNumber"/>
				</td>
				<td>
					<xsl:value-of select="ItemId"/>
				</td>
				<td>
					<xsl:value-of select="MaterialGroup"/>
				</td>
				<td>
					<xsl:value-of select="OrderedQuantity"/>
				</td>
				<td>
					<xsl:value-of select="UnitOfMeasure"/>
				</td>
			</tr>
		</xsl:for-each>
	</table>
</div>
<div class="row d-flex justify-content-end mr-2">
	<table border="1">
		<tr>
			<td>Total Items:</td>
			<td>
				<xsl:value-of select="Order/Summary/TotalItems"/>
			</td>
			<td></td>
		</tr>
		<tr>
			<td>Total Net Amount:</td>
			<td>
				<xsl:value-of select="Order/Summary/TotalNetAmount"/>
			</td>
			<td>
				<xsl:value-of select="Order/Summary/Currency"/>
			</td>
		</tr>

	</table>
</div>
</xsl:template>
</xsl:stylesheet>